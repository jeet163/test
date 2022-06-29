import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TweeterServiceService } from '../tweeter-service/tweeter-service.service';
import { Tweet } from './model/tweet';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css'],
})
export class PostTweetComponent implements OnInit {
  closeResult!: string;

  constructor(
    private modalService: NgbModal,
    private tweeterServiceService: TweeterServiceService
  ) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onTweeetSubmit(data: NgForm) {
    //console.log(data.value.tweet);
    let userID: any = localStorage.getItem('userId');

    let tweet = new Tweet();
    tweet.userId = parseInt(userID, 10);
    tweet.text = data.value.tweet;

    this.tweeterServiceService.postTweet(tweet).subscribe({
      next: (data: any) => {
        console.log(data);
      },
    });
  }
}
