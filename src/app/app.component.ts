import { Component} from '@angular/core';
import textJson from '../assets/textJson.json';

interface Text {
  id: string;
  text1: string;
  text2: string; 
  children: Text[]; 
  expanded?: boolean,
  selected?: boolean;
}
interface Data {
  rows: Text[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textData: Data = { rows: [] };
  selectedRows: Text[] = [];


  constructor() {
    this.textData = textJson;
    this.initializeExpansionState(textJson.rows);
    console.log(textJson)
  }

  toggleChildren(row: Text) {
    row.expanded = !row.expanded;
  }

  toggleSelection(row: Text) {
    row.selected = !row.selected;
    this.toggleChildrenSelection(row, row.selected);
  }


  private toggleChildrenSelection(parent: Text, isSelected: boolean) {
    if (parent.children) {
      parent.children.forEach((child) => {
        child.selected = isSelected;
        this.toggleChildrenSelection(child, isSelected);
      });
    }
  }

  private initializeExpansionState(data: Text[]) {
    data.forEach((row) => {
      row.expanded = false;
      row.selected = false;
      if (row.children && row.children.length > 0) {
        this.initializeExpansionState(row.children);
      }
    });
  }
}
