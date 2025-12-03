import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../core/services/admin/admin.service';
import { OrdersService } from '../../../core/services/order/order.service';
import { ProductService } from '../../../core/services/product/product.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {

  totalRevenue = 0;
  totalOrders = 0;
  productCount = 0;
  lowStockCount = 0;

  topSelling: any[] = [];
  orderStatusCount: any = {};
  recentOrders: any[] = [];

  constructor(
    private adminService: AdminService,
    private ordersService: OrdersService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.adminService.getSalesReport().subscribe((data: any) => {
      this.totalRevenue = data.total_sales;
      this.totalOrders = data.total_orders;
      this.topSelling = data.top_selling_products;
      this.renderTopSellingChart();
    });

    this.productService.getProducts().subscribe((products: any[]) => {
      this.productCount = products.length;
      this.lowStockCount = products.filter(p => p.stock_quantity < 10).length;
    });

    this.ordersService.getAllOrders().subscribe((orders: any[]) => {
      this.recentOrders = orders.slice(0, 5);
      this.computeStatus(orders);
      this.renderStatusChart();
    });
  }

  computeStatus(orders: any[]) {
    const counts: any = {};
    orders.forEach(o => {
      const key = o.status;
      counts[key] = (counts[key] || 0) + 1;
    });
    this.orderStatusCount = counts;
  }

  renderTopSellingChart() {
    new Chart('topSellingChart', {
      type: 'bar',
      data: {
        labels: this.topSelling.map(p => p.name),
        datasets: [{
          label: 'Units Sold',
          data: this.topSelling.map(p => p.quantity_sold),
          backgroundColor: '#8b5e3c'
        }]
      }
    });
  }

  renderStatusChart() {
    new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.orderStatusCount),
        datasets: [{
          data: Object.values(this.orderStatusCount),
          backgroundColor: ['#f5a623', '#7ed321', '#4a90e2', '#d0021b']
        }]
      }
    });
  }
}
