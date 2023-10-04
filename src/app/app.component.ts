import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CheckList for Parents and Child Structure with Expand/ Collapse';
  data: any;

  constructor() {
    this.data = {};
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;

    //List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      {
        id: 1,
        value: 'Elenor Anderson',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 11,
            parent_id: 1,
            value: 'child 1',
            isSelected: false,
            isClosed: false,
            childList: [
              {
                id: 111,
                parent_id: 11,
                value: 'child 11',
                isSelected: false,
                isClosed: false,
                childList: [],
              },
              {
                id: 112,
                parent_id: 11,
                value: 'child 12',
                isSelected: false,
                isClosed: false,
                childList: [],
              },
            ],
          },
          {
            id: 12,
            parent_id: 1,
            value: 'child 2',
            isSelected: false,
            childList: [
              {
                id: 121,
                parent_id: 12,
                value: 'child 121',
                isSelected: false,
                isClosed: false,
                childList: [],
              },
              {
                id: 122,
                parent_id: 12,
                value: 'child 122',
                isSelected: false,
                isClosed: false,
                childList: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        value: 'Caden Kunze',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 21,
            parent_id: 2,
            value: 'child 1',
            isSelected: false,
          },
          {
            id: 22,
            parent_id: 2,
            value: 'child 2',
            isSelected: false,
          },
        ],
      },
      {
        id: 3,
        value: 'Ms. Hortense Zulauf',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 31,
            parent_id: 3,
            value: 'child 1',
            isSelected: false,
          },
          {
            id: 32,
            parent_id: 3,
            value: 'child 2',
            isSelected: false,
          },
        ],
      },
    ];
  }

  //Click event on parent checkbox
  parentCheck(parentObj: { childList: string | any[]; isSelected: any }) {
    // for (var i = 0; i < parentObj.childList.length; i++) {
    // parentObj.childList[i].isSelected = parentObj.isSelected;
    // }
  }

  //Click event on child checkbox
  childCheck(parentObj: { isSelected: any }, childObj: any[]) {
    // parentObj.isSelected = childObj.every(function (itemChild: any) {
    //   return itemChild.isSelected == true;
    // });
  }

  //Click event on master select
  selectUnselectAll(obj: {
    isAllSelected: boolean;
    ParentChildchecklist: string | any[];
  }) {
    // obj.isAllSelected = !obj.isAllSelected;
    // for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
    //   obj.ParentChildchecklist[i].isSelected = obj.isAllSelected;
    //   for (var j = 0; j < obj.ParentChildchecklist[i].childList.length; j++) {
    //     obj.ParentChildchecklist[i].childList[j].isSelected = obj.isAllSelected;
    //   }
    // }
  }

  //Expand/Collapse event on each parent
  expandCollapse(obj: { isClosed: boolean }) {
    obj.isClosed = !obj.isClosed;
  }

  //Master expand/ collapse event
  expandCollapseAll(obj: {
    ParentChildchecklist: string | any[];
    isAllCollapsed: boolean;
  }) {
    for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  //Just to show updated JSON object on view
  stringify(obj: any) {
    return JSON.stringify(obj);
  }

  /* Check if string is valid UUID */
  public checkIfValidUUID(str: string) {
    // Regular expression to check if string is a valid UUID
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str);
  }

  public findById(array: any, id: any): any {
    for (const item of array) {
      if (item.userfullname === id) return item;
      if (item.childList?.length) {
        const innerResult = this.findById(item.childList, id);
        if (innerResult) return innerResult;
      }
    }
  }

  public updateAttributeById(
    array: any,
    id: any,
    depth: any,
    attributeName: string | number,
    attributeValue: any
  ): any {
    for (const item of array) {
      if (item.userfullname === id && item.depth == depth) {
        item[attributeName] = attributeValue;
        return item;
      }

      if (item.childList?.length) {
        const innerResult = this.updateAttributeById(
          item.childList,
          id,
          depth,
          attributeName,
          attributeValue
        );
        if (innerResult && item.depth == depth) {
          item[attributeName] = attributeValue;
          return innerResult;
        }
      }
    }
  }

  public updateElementById(array: any, id: any, depth: any, element: any): any {
    for (const item of array) {
      if (item.userfullname === id && item.depth == depth) {
        item.childList = element;
        return item;
      }

      if (item.childList?.length) {
        const innerResult = this.updateElementById(
          item.childList,
          id,
          depth,
          element
        );
        if (innerResult && item.depth == depth) {
          item.childList = element;
          return innerResult;
        }
      }
    }
  }

  public unCheckAllchildListWithPositions() {
    this.data.ParentChildchecklist.forEach((child: any) => {
      return this.shouldUnCheckChild(child);
    });
  }

  public shouldUnCheckChild(item: any): boolean {
    item.isChecked = false;
    for (let i of item.childList) {
      if (this.shouldUnCheckChild(i)) {
        return (i.isChecked = false);
      }
    }
    // Logic to display the item here based on result
    return item;
  }
}
