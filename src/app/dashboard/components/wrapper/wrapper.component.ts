import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { UserService } from 'src/app/services/user.service';
import { GeeService } from 'src/app/services/gee.service';

import { IUser } from 'src/app/models/user.model';
import { IMap } from 'src/app/models/map.model';
import { IGeeRequest } from 'src/app/models/gee.model';

@Component({
	selector: 'app-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
	// Children
	@ViewChild(MenuComponent) menu?: MenuComponent;
	@ViewChild(MapComponent) map?: MapComponent;
	@ViewChild(InfoComponent) info?: InfoComponent;
	// Component-level variables
	currentUser?: IUser;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private userService: UserService,
		private geeService: GeeService,
	) { }

	ngOnInit(): void {
		// Check if login
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			this.toastr.error('No has iniciado sesión', 'ERROR');
			this.router.navigate(['home/login']);
		} else {
			// Get user with token
			this.userService.getUser().subscribe({
				next: s => {
					this.currentUser = s.data;
					if (this.menu) {
						this.menu.userName = this.currentUser.name;
						this.menu.isAdmin = this.currentUser.role === 1;
					}
				},
			});
		}
	}

	// #region RECEIVED_EVENTS methods

	onDrawMapEvent(): void {
		this.map?.clearCanvas();
		this.map?.drawNewPolygon();
	}

	onSelectMapEvent(map: IMap): void {
		this.map?.drawExistingPolygon(map);
	}

	onAnalyzeMapEvent(data: IGeeRequest): void {
		data.mapId = this.map!.currentMap!._id!;
		this.geeService.getImage(data).subscribe({
			next: s => {
				this.map?.overlayImage(s.data);
				this.toastr.success(`Obtenida imagen capturada en ${s.data.date}`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		this.geeService.getValuesByDate(data).subscribe({
			next: s => {
				console.log(s.data);
				// TODO send data to chart
				this.toastr.success(`Obtenidos los valores de ${s.count} imágenes`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
	}

	onLogoutEvent(): void {
		localStorage.clear();
		this.router.navigate(['']);
	}

	// #endregion
}
