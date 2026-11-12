import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId: string = '';
	track: TrackData | null = null;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const trackId = params.get('id');
      if (trackId === null) {
        console.error('Track route is missing its required id parameter.');
        return;
      }

      this.trackId = trackId;
      this.track = null;

      this.spotifyService.getTrack(this.trackId).then((track) => {
        this.track = track;
      });
    });
  }

}
