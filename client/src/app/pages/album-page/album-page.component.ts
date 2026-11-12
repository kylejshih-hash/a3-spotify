import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId: string = '';
	album: AlbumData | null = null;
	tracks: TrackData[] | null = null;


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const albumId = params.get('id');
      if (albumId === null) {
        console.error('Album route is missing its required id parameter.');
        return;
      }

      this.albumId = albumId;
      this.album = null;
      this.tracks = null;

      this.spotifyService.getAlbum(this.albumId).then((album) => {
        this.album = album;
      });
      this.spotifyService.getTracksForAlbum(this.albumId).then((tracks) => {
        this.tracks = tracks;
      });
    });
  }

}
