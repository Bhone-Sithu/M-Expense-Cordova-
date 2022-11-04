const onBodyLoad = () => {
    const db = window.openDatabase("M-Expense", "1.0", "Trip", 2000000)
    const trip = JSON.parse(localStorage.getItem("trip"))
    const trip_id = trip.tid;
    $("#trip").append(`
                        <div class="" style="width:100%;background-color:white;border-radius:5%;padding:5%;margin-bottom:5%;">
                            <div>
                                <h3>${trip.name}s</h3>
                                <h6 class="text-muted">Destination: ${trip.destination}</h6>
                                <h6 class="text-muted">Departure: ${trip.departure_date}</h6>
                                <h6 class="text-muted">Arrival: ${trip.arrival_date}</h6>
                                <h6 class="text-muted">Risk assesment: ${trip.is_assesment == "true" ? "Required" : "Not Required"}</h6>
                                <h6 class="text-muted">Budget: ${trip.budget}</h6>
                                <h6 class="text-muted">Description: ${trip.description}</h6>
                            </div>
                        </div>
                        
                        `)

    $("#edit").click(() => {
        location.href="edit_trip.html"
    })
    $("#delete").click(() => {
        let delete_sql = `delete from trip where tid = ${trip_id}`
        db.transaction((tx) => {
            tx.executeSql(delete_sql, [],
                (tx, res) => {
                    alert("trip deleted")
                    location.href="index.html"
                },
                (error)=>{
                    console.log(error)
                })
        })
    })
    $("#back").click(()=>{
        location.href="index.html"
    })
}