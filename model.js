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

  save(){
    let fieldsData = "";
    let fieldsKeys = "";
    let fieldsValues = "";
    for(let key in this){
      if(key != 'pk' && key != 'hasMany' && key != 'fields'){
        fieldsData += `${key}='${this[key]}',`;
        fieldsKeys += `${key},`;
        fieldsValues += `'${this[key]}',`;
      } 
    }
    fieldsData = fieldsData.substring(0, fieldsData.length - 1);
    fieldsKeys = fieldsKeys.substring(0, fieldsKeys.length - 1);
    fieldsValues = fieldsValues.substring(0, fieldsValues.length - 1);
    if(this.id){
      global.db.query(`UPDATE ${this.constructor.table()} SET ${fieldsData} WHERE ${this.pk}=${this.id}`);
    }else{
      global.db.query(`INSERT INTO ${this.constructor.table()}(${fieldsKeys}) VALUES(${fieldsValues})`);
    }
  }

  delete(id){
    global.db.query(`DELETE FROM ${this.constructor.table()} WHERE ${this.pk}=${id}`);
  }
}

module.exports = Model;
