class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
// searching by keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
          
        }
      : {};
    
    this.query = this.query.find({ ...keyword });
    

    return this;
  }
 
  filter(){

    // for category filter
    const queryCopy={...this.queryStr}
    
    // removing the fields for category
    const removeFields=["keyword","page","limit"]
    removeFields.forEach((key)=> delete queryCopy[key])
    
   // filter for price and rating
   let queryStr=JSON.stringify(queryCopy)
   
   queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
   


    this.query=this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultperpage){
    const currPage=this.queryStr.page ||1;
    const skip=resultperpage * (currPage-1);

    this.query=this.query.limit(resultperpage).skip(skip);
    return this;

  }


}

module.exports = ApiFeatures;
