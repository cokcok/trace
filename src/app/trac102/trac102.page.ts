import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-trac102',
  templateUrl: './trac102.page.html',
  styleUrls: ['./trac102.page.scss'],
})
export class Trac102Page implements OnInit {
  trac1_id:string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.trac1_id = this.route.snapshot.paramMap.get('trace1_id');
  }

}
