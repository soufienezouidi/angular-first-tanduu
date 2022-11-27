import { Component, OnInit } from '@angular/core';
import { OrderSentService } from '../../services/orders/order-sent/orders-sent.service';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css'],
})
export class BlankPageComponent implements OnInit {
  constructor(private orderService: OrderSentService) {}
  rcorders: any[] = [];
  ngOnInit(): void {
    let user = localStorage.getItem('rest');
    let id: any = {
      companyId: JSON.parse(user).rest_id,
    };
    this.orderService.getrecievedorders(id).subscribe((el: any) => {
      this.rcorders = el.received;
    });

    $(document).ready(() => {
      var timeout: any = 0;
      $('*').hover((e) => {
        const sl: HTMLElement = e.currentTarget;
        var inter = setInterval(() => {
          timeout += 1;
          if (timeout === 2000 && !sl.className.includes('hovered-class')) {
            clearInterval(inter);

            timeout = 0;
          }
        });
      });
    });
  }
  acceptorder(or: any) {
    var pathobj: any = { sender: or.senderId, receiver: or.receiverId };

    let objOrderId: any = {
      order_id: or.orders_infos.id,
    };
    this.orderService.getOrderById(objOrderId).subscribe((data: any) => {
      var t1: any[] = [];
      const result: any[] = data.jobbers_list.filter((elem) => elem.state == 1);

      var pts: any = result[0];
      var ptsearch: any[] = result.splice(1, result.length);

      var n: number = 5;
      var pathfound: boolean = false;
      var rec_id: Number = 3;
      ptsearch.forEach((el: any) => {});
      do {
        var index = ptsearch.findIndex(function (item, i) {
          return item.receiver === rec_id;
        });

        t1.push(ptsearch[index]);

        if (ptsearch[index].sender == pts.sender) {
          pathfound = true;
        }
        rec_id = ptsearch[index].sender;
      } while (!pathfound);
      t1.push(pts);
    });
  }
  showcard(id: any) {}
}
