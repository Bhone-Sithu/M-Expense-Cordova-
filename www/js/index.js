
const onBodyLoad = () => {

    const db = window.openDatabase("M-Expense", "1.0", "Trip", 2000000) // 20k = size of db (MB for 6 0 numbers)
    let drop = "drop table trip";
    let create = "create table if not exists trip(tid integer primary key autoincrement,name varchar, destination varchar, departure_date varchar, arrival_date varchar, is_assesment boolean, budget integer, description varchar) "
    db.transaction(
        (tx) => {
            tx.executeSql(create, [],
                (tx, res) => { },
                (error) => { console.log(error) })
        }

    )
    let select = "select * from trip"
    
    db.transaction(
        (tx) => {
            tx.executeSql(select, [],
                (tx, res) => {

                    for (let index = 0; index < res.rows.length; index++) {
                        
                        $("#trips").append(`
                        <div class="container row" id="trip_${index}" style="width:100%;background-color:white;border-radius:5%;padding:5%;margin-bottom:5%;">
                            <div class="col-10">
                                <h3>${res.rows[index].name}</h3>
                                <h6 class="text-muted">Destination: ${res.rows[index].destination}</h6>
                                <h6 class="text-muted">Departure: ${res.rows[index].departure_date}</h6>
    
                            </div>
                            <div class="col-2" style="display:flex;align-items:center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#abffab"
                                    class="bi bi-caret-right-fill" viewBox="0 0 16 16" style="">
                                    <path
                                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                </svg>
                            </div>
                        </div>
                        
                        `)
                        $(`#trip_${index}`).click(() => {
                            console.log(res.rows[index])
                            localStorage.setItem("trip", JSON.stringify(res.rows[index]))
                            location.href = "trip_detail.html"
                        })

                    }
                },
                (error) => { console.log(error) })
        }
    )

}
