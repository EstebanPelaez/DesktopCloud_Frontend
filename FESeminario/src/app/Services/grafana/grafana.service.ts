import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrafanaService {
  private grafanaBaseUrl = 'https://your-grafana-instance/api/dashboards/db';

  constructor(private http: HttpClient) {}

  getDashboardData(dashboardId: string) {
    return this.http.get(`${this.grafanaBaseUrl}/${dashboardId}`);
  }
}
