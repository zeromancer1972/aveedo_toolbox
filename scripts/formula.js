var Formula = {
    /* @param obj:String, viewName:String, colNo:int, unique:boolean */
    DbColumn: function(obj, viewName, colNo, unique) {
        try {
            /* get the data source */
            var db = API.getDatabaseForObject(obj);
            /* get the view */
            var view = db.getView(viewName);
            /* get all documents by the key */
            var col = view.getAllEntries();
            /* build the return list */
            var list = [];
            var ent = col.getFirstEntry();
            while (ent != null) {
                var cols = ent.getColumnValues();
                var colVal = cols.elementAt(colNo - 1);
                if (!unique || !Formula.inArray(colVal, list)) {
                    list.push();
                }
                ent = col.getNextEntry(ent);
            }
            /* return the list */
            return list;
        } catch (e) {
            API.log().error(e.toString());
            return "ERROR - check log";
        }
    },
    /* @param obj:String, viewName:String, key:any, colNo:int */
    DbLookup: function(obj, viewName, key, colNo) {
        try {
            /* get the data source */
            var db = API.getDatabaseForObject(obj);
            /* get the view */
            var view = db.getView(viewName);
            /* get all documents by the key */
            var col = view.getAllEntriesByKey(key, true);
            /* build the return list */
            var list = [];
            var ent = col.getFirstEntry();
            while (ent != null) {
                list.push(ent.getColumnValues().elementAt(colNo - 1));
                ent = col.getNextEntry(ent);
            }
            /* return the list */
            return list;

        } catch (e) {
            API.log().error(e.toString());
            return "ERROR - check log";
        }
    },
    /* aux function */
    inArray: function(target, array) {
        /* Caching array.length doesn't increase the performance of the for loop on V8 (and probably on most of other major engines) */
        for (var i = 0; i < array.length; i++) {
            if (array[i] === target) {
                return true;
            }
        }
        return false;
    }
}
