import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faReddit,
  faGitlab,
  faTelegram,
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  twitterIcon = faTwitter;
  redditIcon = faReddit;
  gitlabIcon = faGitlab;
  telegramIcon = faTelegram;
  discordIcon = faDiscord;
  mediumIcon = faMedium;

  constructor() {}

  ngOnInit(): void {}
}
