const tableBody = document.querySelector("#tableBody")
const parent = document.querySelector("#parent")

const showAllBtn = document.querySelector("#all")
const frontendRadioBtn = document.querySelector("#Frontend")
const backendRadioBtn = document.querySelector("#Backend")
const netRadioBtn = document.querySelector("#NET")

const searchInput = document.querySelector("#search")
const searchBtn = document.querySelector("#searchBtn")


//Global funcs
const containsAll = (arr1, arr2) =>
    arr2.every(arr2Item => arr1.includes(arr2Item))

let getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

const comparator = (a1, a2) => {
    if (a1.dataset.order < a2.dataset.order) {
        return -1
    }

    if (a1.dataset.order > a2.dataset.order) {
        return 1
    }

    return 0
}

// Create cards
const createStudentcard = (user) => {
    const studentCard = document.createElement("tr")

    const firstName = document.createElement("td")
    firstName.textContent = user.firstName
    studentCard.appendChild(firstName)

    const lastName = document.createElement("td")
    lastName.textContent = user.lastName
    studentCard.appendChild(lastName)

    const age = document.createElement("td")
    age.textContent = user.age
    studentCard.appendChild(age)

    const hobbies = document.createElement("td")
    hobbies.textContent = user.hobbies
    studentCard.appendChild(hobbies)

    const programme = document.createElement("td")
    programme.textContent = user.programme
    studentCard.appendChild(programme)

    studentCard.addEventListener("click", async () => {
        parent.innerHTML = ""
        let schoolsData = await getData("https://api.mocki.io/v2/01047e91/schools")

        const student = user.programme
        const possibleSchools = []

        schoolsData.map((school) => {
            const activities = Object.values(school.programmes)
            const intersection = activities.filter(element => student.includes(element));

            if (intersection.length > 0) {
                possibleSchools.push(school)
            }
        })

        const studentProfileCard = document.createElement("div")
        studentProfileCard.setAttribute("id", "studentProfileCard")

        const fullName = document.createElement("p")
        fullName.textContent = `Name: ${user.firstName} ${user.lastName}`
        studentProfileCard.appendChild(fullName)

        const age = document.createElement("p")
        age.textContent = `Age: ${user.age}`
        studentProfileCard.appendChild(age)

        const hobbies = document.createElement("p")
        hobbies.textContent = `Hobbies: ${user.hobbies}`
        studentProfileCard.appendChild(hobbies)

        const programme = document.createElement("p")
        programme.textContent = `Programme ${user.programme}`
        studentProfileCard.appendChild(programme)

        const schoolName = document.createElement("ul")
        schoolName.textContent = `Show Schools`
        studentProfileCard.appendChild(schoolName)

        schoolName.addEventListener("click", () => {
            schoolName.innerHTML = "Schools: "
            schoolsData.forEach((school) => {
                const schools = document.createElement("li")
                schools.textContent = school.name
                schoolName.appendChild(schools)


                if (!containsAll(school.programmes, [user.programme])) {
                    schools.style.color = "red"
                    schools.setAttribute("data-order", "3")
                }
                if (containsAll(school.programmes, [user.programme])) {
                    schools.style.color = "yellow"
                    schools.setAttribute("data-order", "2")
                }
                if (containsAll(school.programmes, [user.programme]) && containsAll(school.activities, user.hobbies)) {
                    schools.style.color = "green"
                    schools.setAttribute("data-order", "1")
                }

            })
            const order = document.querySelectorAll('[data-order]')

            const orderArray = Array.from(order)
            const sorted = orderArray.sort(comparator)

            sorted.forEach((element) => {
                schoolName.appendChild(element)
            })

        })

        const closeBtn = document.createElement("button")
        closeBtn.setAttribute("class", "closeBtn")
        closeBtn.textContent = "X"
        studentProfileCard.appendChild(closeBtn)

        closeBtn.addEventListener("click", () => {
            parent.innerHTML = ""
        })

        parent.appendChild(studentProfileCard)
    })

    tableBody.appendChild(studentCard)
}


const getStudents = async () => {
    let students = await getData("https://api.mocki.io/v2/01047e91/students")
    console.log(students)
    students.forEach((user) => {
        createStudentcard(user)
    })
}
getStudents()

// Filter by radio buttons
const getFilteredStudents = async (programme) => {
    tableBody.innerHTML = ""
    let students = await getData("https://api.mocki.io/v2/01047e91/students")
    students.forEach((user) => {
        if (user.programme === programme) {
            createStudentcard(user)
        } else {}

    })
}

showAllBtn.addEventListener("click", () => {
    tableBody.innerHTML = ""
    getStudents()
})
frontendRadioBtn.addEventListener("click", () => {
    getFilteredStudents("Frontend")
})
backendRadioBtn.addEventListener("click", () => {
    getFilteredStudents("Backend")
})
netRadioBtn.addEventListener("click", () => {
    getFilteredStudents(".NET")
})

// Search bar
const getSearchedStudents = async (name) => {
    tableBody.innerHTML = ""
    name = searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase();
    const hobbieInput = searchInput.value.charAt(0).toLowerCase() + searchInput.value.slice(1).toLowerCase();
    const netSearch = searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toUpperCase();

    let students = await getData("https://api.mocki.io/v2/01047e91/students")

    students.forEach((user) => {
        if (user.firstName === name || user.lastName === name || user.programme == name || user.programme == netSearch || containsAll(user.hobbies, [hobbieInput])) {
            createStudentcard(user)
        }

    })
}

searchBtn.addEventListener("click", () => {
    getSearchedStudents()
    searchInput.value = ""
})

// Sort by First name, last name and age by clicking the TH!
const sortTable = (n) => {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}