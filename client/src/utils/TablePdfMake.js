import Utils from ".";

class Table {
    constructor(thead, data) {
        this.thead = thead;
        this.data = data;

        this.tableBody = [
            Utils.thead(thead, 'center', true),
            ...data.map((item, index) => [

                { text: item.lastName, alignment, valign },
                { text: item.firstName, alignment, valign },
               
            ]),
        ];
    }



    consolll() {
        console.log("class ", this.thead)
    }


}

export default Table;



