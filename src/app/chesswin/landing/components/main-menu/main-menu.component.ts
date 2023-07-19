import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-main-menu',
	templateUrl: './main-menu.component.html',
	styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

	items = [
		{ 'icon':'icon 2 coins', 'itemText': 'Play with ChessCoin', 'img': 'horse', 'background': 'gold'},
		{ 'icon':'icon 3 hand with coin', 'itemText': 'ChessCoin Shop', 'img': 'queen', 'background': 'gold'},
		{ 'icon':'icon 1 caballo', 'itemText': 'Play for free', 'img': 'horse', 'background': 'plata'},
		{ 'icon':'icon 4 cubo', 'itemText': 'Play with Friends', 'img': 'queen', 'background': 'gold'},
	]

	constructor(
	) {}

	ngOnInit(): void {}
}