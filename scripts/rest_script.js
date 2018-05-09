var body = API.getRequestBodyJson();
var arr = new org.json.simple.JSONArray();
var db = session.getDatabase("", "names.nsf");
var all = db.getAllDocuments();
var doc = all.getFirstDocument();
var count = 0;
while (doc != null) {
    var form = doc.getItemValueString("form");
    if (form == body.type) {
        var docObj = new org.json.simple.JSONObject();
        docObj.put("docid", doc.getUniversalID());
        docObj.put("form", form);
        docObj.put("name", doc.getItemValueString("Fullname") + doc.getItemValueString("Listname"));
        arr.push(docObj);
        count++;
    }
    doc = all.getNextDocument(doc);
}
var obj = new org.json.simple.JSONObject();
obj.put("total", count);
obj.put("values", arr);
return obj.toJSONString();