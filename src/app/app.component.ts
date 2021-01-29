import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spacegraph';

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.setMissions();
  }

  error=false;
  missions;
  setMissions(){
    this.error=false;
    this.getMissions()
    .toPromise()
    .then(missions=>{this.missions=missions})
    .catch(error=>{console.log(error); this.error=true;});
  }

  getMissions(){
    return this.http.get("/missions");
  }
}
