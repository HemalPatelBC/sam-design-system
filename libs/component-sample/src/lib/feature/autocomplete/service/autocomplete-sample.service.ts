/* tslint:disable */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {SDSAutocomplteServiceInterface} from '@gsa-sam/components';


import { SampleAutocompleteData, SSDSSelectedItemModelel } from './autocomplete-sample.data';


@Injectable()
export class AutocompleteSampleDataService implements SDSAutocomplteServiceInterface {

    private loadedData;
    constructor() {
        const data = SampleAutocompleteData;
        for (let i = 0; i < data.length; i++) {

            let item = data[i];
            let results = data.filter(it => it.parentId === item.id);
            item['childCount'] = results.length;
        }
        this.loadedData = data;
    }

    getDataByText(currentItems: number, searchValue?: string): Observable<SDSSelectedItemModel> {
        let itemIncrease = 25;
        let data = of(this.loadedData);
        let itemsOb: Observable<Object[]>;
        if (searchValue) {
            itemsOb = data.map(items => items.filter(itm =>
                (itm.name.indexOf(searchValue) !== -1 ||
                    itm.subtext.indexOf(searchValue) !== -1
                )));
        } else {
            itemsOb = data;
        }
        let items: object[];
        itemsOb.subscribe(
            (result) => {
                items = result;
            }
        );
        let totalItemCount = items.length;

        let maxSectionPosition = currentItems + itemIncrease;
        if (maxSectionPosition > totalItemCount) {
            maxSectionPosition = totalItemCount;
        }
        let subItemsitems = items.slice(currentItems, maxSectionPosition);

        let returnItem = {
            items: subItemsitems,
            totalItems: totalItemCount
        };
        return of(returnItem);
    }




   



}
