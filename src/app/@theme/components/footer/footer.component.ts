import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="https://motionpicture.jp/" target="_blank">motionpicture</a></b> 2017</span>
    <div class="socials">
      <a href="https://github.com/motionpicture" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
