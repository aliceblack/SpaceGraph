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
    this.getMissionsGraphQL()
    .toPromise()
    .then(missions=>{this.missions=missions["data"]["launches"]})
    .catch(error=>{console.log(error); this.error=true;});
  }

  getMissionsREST(){
    return this.http.get("/missions");
  }

  getMissionsGraphQL(){
    let requestBody = {
      "query": "{launches{mission_name,launch_date_utc,details,rocket{rocket_name,rocket_type},links{mission_patch}}}",
      "variables": null
    };
    return this.http.post("/graphql?", requestBody);
  }
}
