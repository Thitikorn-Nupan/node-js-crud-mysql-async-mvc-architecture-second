class DirectSqlService {
    static reads = 'select * from toys;'
    static read = 'select * from toys where tid = ? ;'
    static create = 'insert into  toys(name, status ,price ,  release_date) values(?,?,?,?) ;'
    static delete = 'delete from toys where tid = ? ;'
    static update = 'update toys set name = ? , price = ? , status = ? where tid = ? ;'
}
module.exports = DirectSqlService