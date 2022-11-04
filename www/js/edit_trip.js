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
        if (validate()) {
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
        }

    })
    $("#back").click(() => {
        location.href = "trip_detail.html"
    })
    const validate = () => {
        let is_valid = true;

        let name = $("#name").val();
        if (name.trim() == "") {
            $("#name").addClass("is-invalid");
            is_valid = false;
        }

        let destination = $("#destination").val();
        if (destination.trim() == "") {
            $("#destination").addClass("is-invalid");
            is_valid = false;
        }

        let departure_date = $("#departure_date").val();
        if (departure_date.trim() == "") {
            $("#departure_date").addClass("is-invalid");
            is_valid = false;

        }

        let arrival_date = $("#arrival_date").val();
        if (arrival_date.trim() == "") {
            $("#arrival_date").addClass("is-invalid");
            is_valid = false;
        }

        let radio = $('input[name="radio"]:checked').val();
        if (radio === undefined) {
            $("#radio_yes").addClass("is-invalid")
            $("#radio_no").addClass("is-invalid")
            is_valid = false;
        }
        else (radio == "true") ? radio = true : radio = false;

        let budget = $("#budget").val();
        console.log(budget);
        if (budget === 0) {
            $("#budget").addClass("is-invalid");
            is_valid = false;
        }
        if (budget === "") {
            $("#budget").addClass("is-invalid");
            is_valid = false;
        }

        let description = $("#description").val();
        return is_valid;

    }
}