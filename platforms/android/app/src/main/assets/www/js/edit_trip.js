const onBodyLoad = () => {
    const db = window.openDatabase("M-Expense", "1.0", "Trip", 2000000)
    const trip = JSON.parse(localStorage.getItem("trip"))
    const trip_id = trip.tid;
    $("#name").val(trip.name);
    $("#destination").val(trip.destination);
    $("#departure_date").val(trip.departure_date);
    $("#arrival_date").val(trip.arrival_date);
    trip.is_assesment == "true" ? $("#radio_yes").attr('checked', "true") : $("#radio_no").attr('checked', "false")
    $("#budget").val(trip.budget);
    $("#description").val(trip.description);
    $("#edit").click(() => {
        let assesment;
        // $("#radio_yes").val()
        console.log()

        let edit_sql = `update trip set name = "${$("#name").val()}",destination = ?,departure_date = ?,arrival_date = ?,is_assesment = ?,budget = ?,description = ? where tid = ${trip_id}`
        db.transaction(
            (tx) => {
                tx.executeSql(edit_sql, [$("#destination").val(), $("#departure_date").val(), $("#arrival_date").val(), $('input[name="radio"]:checked').val(), $("#budget").val(), $("#description").val()],
                    (tx, res) => {
                        let select = `select * from trip where tid = ${trip_id}`

                        db.transaction(
                            (tx) => {
                                tx.executeSql(select, [],
                                    (tx, res) => {
                                        localStorage.setItem("trip", JSON.stringify(res.rows[0]))
                                        location.href = "trip_detail.html"
                                    })
                            }
                        )
                    },
                    (error) => console.log(error))
            }
        )
    })
    $("#back").click(()=>{
        location.href="trip_detail.html"
    })
}