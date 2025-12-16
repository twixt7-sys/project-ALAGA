import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../core/services/admin/admin.service';
import { OrdersService } from '../../../core/services/order/order.service';
import { OrderServices, ProductService } from '../../../core/services';
import { AuthServices } from '../../../core/services';
import { ComponentsModule } from '../../../shared/components/components-module';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
// ===== dashboard cards =====
  totalRevenue = 0;
  totalOrders = 0;
  productCount = 0;
  lowStockCount = 0;

  // ===== charts & tables =====
  topSelling: any[] = [];
  orderStatusCount: any = {};
  recentOrders: any[] = [];

  // ===== chart instances =====
  topSellingChart?: Chart;
  statusChart?: Chart;

  constructor(
    private adminService: AdminService,
    private ordersService: OrderServices,
    private productService: ProductService,
    private authService: AuthServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();

    this.ordersService.ordersUpdated$.subscribe(() => {
      this.loadDashboard();
    });
  }

  // ===============================
  // Main loader
  // ===============================
  loadDashboard() {
    this.loadSalesReport();
    this.loadProducts();
    this.loadOrders();
  }

  // ===============================
  // Sales report aggregation
  // ===============================
  loadSalesReport() {
    this.adminService.getSalesReport().subscribe((reports: any[]) => {

      // total revenue
      this.totalRevenue = reports.reduce(
        (sum, r) => sum + Number(r.total_sales || 0),
        0
      );

      // total orders
      this.totalOrders = reports.reduce(
        (sum, r) => sum + Number(r.total_orders || 0),
        0
      );

      // merge top selling products
      this.topSelling = this.mergeTopSelling(reports);
      this.renderTopSellingChart();
    });
  }

  mergeTopSelling(reports: any[]): any[] {
    const map: any = {};

    reports.forEach(r => {
      (r.top_selling_products || []).forEach((p: any) => {
        if (!map[p.name]) {
          map[p.name] = 0;
        }
        map[p.name] += Number(p.quantity_sold);
      });
    });

    return Object.entries(map)
      .map(([name, quantity_sold]) => ({ name, quantity_sold }))
      .sort((a: any, b: any) => b.quantity_sold - a.quantity_sold)
      .slice(0, 5);
  }

  // ===============================
  // Inventory stats
  // ===============================
  loadProducts() {
    this.productService.getProducts().subscribe((products: any[]) => {
      this.productCount = products.length;
      this.lowStockCount = products.filter(
        p => p.stock_quantity < 10
      ).length;
    });
  }

  // ===============================
  // Orders & status chart
  // ===============================
  loadOrders() {
    this.ordersService.getAllOrders().subscribe((orders: any[]) => {

      this.recentOrders = orders
        .sort(
          (a, b) =>
            +new Date(b.order_date) - +new Date(a.order_date)
        )
        .slice(0, 5);

      this.computeOrderStatus(orders);
      this.renderStatusChart();
    });
  }

  computeOrderStatus(orders: any[]) {
    const counts: any = {};

    orders.forEach(o => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });

    this.orderStatusCount = counts;
  }

  // ===============================
  // Charts
  // ===============================
renderTopSellingChart() {
  this.topSellingChart?.destroy();
  this.topSellingChart = new Chart('topSellingChart', {
    type: 'bar',
    data: {
      labels: this.topSelling.map(p => p.name),
      datasets: [{
        label: 'Units Sold',
        data: this.topSelling.map(p => p.quantity_sold)
      }]
    },
    options: {
      scales: {
        x: {
          ticks: {
            display: false
          }
        },
        y: {
          beginAtZero: false
        }
      },
      plugins: {
        tooltip: {
          enabled: true
        }
      }
    }
  });
}

  renderStatusChart() {
    this.statusChart?.destroy();

    this.statusChart = new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.orderStatusCount),
        datasets: [{
          data: Object.values(this.orderStatusCount)
        }]
      }
    });
  }
  logout() {
    this.authService.logout();
    Swal.fire({
      title: "Success!",
      text: "User Logged Out!",
      icon: "success"
    });
    this.router.navigate(['/auth']);
  }
}
