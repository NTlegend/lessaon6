class Model {
  load(id){
    global.db.query(`SELECT * FROM ${this.constructor.table()} WHERE ${this.pk}=${id}`, function(error, result){
      if(error){
        console.log(error);
      }

      for(let value of result){
        for(let key in value){
          this[key] = value[key];
        }
      }
      console.log(result);
    });
  }

  loadAll(){
    global.db.query(`SELECT * FROM ${this.constructor.table()}`, function(error, result){
      if(error){
        console.log(error);
      }
      for(let value of result){
        for(let key in value){
          this[key] = value[key];
        }
      }
      console.log(result);
    });
  }
}

module.exports = Model;
