import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  getData() {
    return "getData works!";
  }

  postData(data: any) {
    return "postData works!";
  }

  updateData(id: string, data: any) {
    return "updateData works!";
  }

  deleteData(id: string) {
    return "deleteData works!";
  }
}
