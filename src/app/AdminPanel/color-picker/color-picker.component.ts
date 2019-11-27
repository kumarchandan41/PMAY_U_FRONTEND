import { Component,  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent  { //implements OnInit
  @Input() heading: string;
  @Input() color: string;
  @Output() event: EventEmitter<string> = new EventEmitter<string>();

public show = false;
public defaultColors: string[] = [
 '#FFA07A',
'#FA8072',
'#E9967A',
'#F08080',
'#FF7F50',
'#FFD700',
'#FFA500',
'#FF8C00',
'#FFFFE0',
'#FFFACD',
'#FAFAD2',
'#FFEFD5',
'#FFE4B5',
'#FFDAB9',
'#EEE8AA',
'#F0E68C',
'#BDB76B',
'#FFFF00',
'#7CFC00',
'#7FFF00',
'#32CD32',
'#00FF00',
'#ADFF2F',
'#9ACD32',
'#00FF7F',
'#00FA9A',
'#90EE90',
'#98FB98',
'#8FBC8F',
'#3CB371',
'#E0FFFF',
'#00FFFF',
'#00FFFF',
'#7FFFD4',
'#66CDAA',
'#AFEEEE',
'#40E0D0',
'#48D1CC',
'#00CED1',
'#B0E0E6',
'#ADD8E6',
'#87CEFA',
'#87CEEB',
'#E6E6FA',
'#D8BFD8',
'#DDA0DD',
'#EE82EE',
'#DA70D6',
'#FFC0CB',
'#FFFFFF',
'#FFFAFA',
'#F0FFF0',
'#F5FFFA',
'#F0FFFF',
'#F0F8FF',
'#F8F8FF',
'#F5F5F5',
'#FFF5EE',
'#F5F5DC',
'#FDF5E6',
'#FFFAF0',
'#FFFFF0',
'#FAEBD7',
'#FAF0E6',
'#FFF0F5',
'#FFE4E1',
'#DCDCDC',
'#D3D3D3',
'#C0C0C0',
'#A9A9A9',
'#FFF8DC',
'#FFEBCD',
'#FFE4C4',
'#FFDEAD',
'#F5DEB3',
'#DEB887',
'#D2B48C',
'#BC8F8F',
'#F4A460',
'#DAA520',
'#CD853F',
'#D2691E'

//   '#ffffff',
//   '#AFB5CE',
//   '#3e6158',
//   '#3f7a89',
//   '#96c582',
//   '#b7d5c4',
//   '#bcd6e7',
//   '#7c90c1',
//   '#9d8594',
//   '#dad0d8',
//   '#ACB7E4', 
//  '#C89BE2', 
//   '#DEADEE', 
//   '#ee3e6d',
//   '#d63d62',
//   '#c6a670',
//   '#f46600',
//  '#E89492',  
//   '#efabbd',
//  '#D18393', 
//   '#f0b89a',
//   '#f0ca68',
//  '#DFA495', 
//   '#c97545',
//   '#c1800b'
];

constructor() {
}

/**
* Change color from default colors
* @param {string} color
*/
public changeColor(color: string): void {
 this.color = color;
 this.event.emit(this.color);
 this.show = false;
}


/**
* Change color from input
* @param {string} color
*/
public changeColorManual(color: string): void {
 const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

 if (isValid) {
   this.color = color;
   this.event.emit(this.color);
 }
}

/**
* Change status of visibility to color picker
*/
public toggleColors(): void {
 this.show = !this.show;
}
}
