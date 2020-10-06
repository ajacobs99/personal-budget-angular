import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public dataSource = {
      datasets: [
          {
              data: [30, 350, 90],
              backgroundColor: [
                  '#ffcd56',
                  '#fd6b19',
                  '#36a2eb',
                  '#b4f0be',
                  '#963793',
                  '#e0d11a',
                  '#ffc0cb',
              ],
          }
      ],
      labels: [
          'Eat out',
          'Rent',
          'Groceries'
      ]};
  constructor(private http: HttpClient) {  }

  ngOnInit(): void
  {
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        //console.log();
        //debugger;
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
    });

  }
  createChart() {
    //var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById('myChart');

    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
    });
  }
}
