const onBodyLoad = () => {
    const db = window.openDatabase("M-Expense", "1.0", "Trip", 2000000) // 20k = size of db (MB for 6 0 numbers)


    $("#add").click(() => {

        insert_trip();
    })
    const insert_trip = () => {
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
        if (is_valid == true) {
            let insert = "insert into trip(name,destination,departure_date,arrival_date,is_assesment,budget,description) values (?,?,?,?,?,?,?)";
            db.transaction(
                (tx) => {
                    tx.executeSql(insert, [name, destination, departure_date, arrival_date, radio, budget, description],
                        (tx, res) => {
                            alert("Trip inserted")
                            location.href = "index.html"
                        },
                        (error) => console.log(error))
                }
            )
        }

    }
    $("#back").click(() => {
        location.href = "index.html"
    })

}

