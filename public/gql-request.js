function gql(value, callback) {
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: value
        })
    };

    fetch(`http://localhost:3000/graphql`, options)
        .then(res => res.json())
        .then(res => callback);

}