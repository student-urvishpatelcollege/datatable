function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateDuration(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} years ${months} months`;
}

export const students = Array.from({ length: 100 }).map((_, i) => {
    const idNum = 19010010000 + (i + 1);
    const names = [
        "Aarav Sharma", "Vivaan Mehta", "Aditya Nair", "Vihaan Reddy", "Arjun Patel",
        "Sai Iyer", "Reyansh Kapoor", "Krishna Menon", "Ishaan Joshi", "Rohan Chawla",
        "Ananya Desai", "Aadhya Singh", "Diya Agarwal", "Myra Bansal", "Ira Malhotra",
        "Pari Gupta", "Navya Kulkarni", "Anika Verma", "Saanvi Rao", "Avni Khanna",
        "Prisha Dutta", "Aarohi Sinha", "Ishika Yadav", "Meera Saxena", "Nitya Bhattacharya",
        "Kavya Ghosh", "Tanvi Das", "Mira Pillai", "Shruti Ramesh", "Simran Thomas",
        "Raj Malhotra", "Aryan Sharma", "Kabir Nair", "Devansh Menon", "Kunal Gupta",
        "Manav Deshmukh", "Nikhil Bhatia", "Yash Agarwal", "Rajat Kapoor", "Abhinav Sethi",
        "Harshvardhan Iyer", "Siddharth Jain", "Aniket Reddy", "Pranav Mehra", "Tushar Gokhale",
        "Raghav Chauhan", "Amitabh Pillai", "Samar Khurana", "Varun Chatterjee", "Rudra Basu",
        "Neha Kulkarni", "Shreya Sharma", "Ritika Bhandari", "Aishwarya Shetty", "Sneha Iyer",
        "Pooja Bhatt", "Kritika Kaur", "Harini Raghavan", "Lavanya Menon", "Bhavya Shah",
        "Charvi Deshmukh", "Ishita Patel", "Radhika Rao", "Suhani Singh", "Vandana Nair",
        "Deepa Agarwal", "Akanksha Goyal", "Madhuri Joshi", "Anjali Mehta", "Pallavi Sen",
        "Ganesh Iyer", "Suresh Kumar", "Mukesh Sharma", "Vikram Chauhan", "Dinesh Menon",
        "Anil Kapoor", "Prakash Nair", "Sanjay Sinha", "Ajay Malhotra", "Manish Gupta",
        "Sunil Bhat", "Rajesh Khanna", "Harish Reddy", "Karthik Subramanian", "Vijay Patil",
        "Abhay Pandey", "Ravi Shankar", "Bharat Mehta", "Gopal Verma", "Mohan Lal",
        "Ramesh Yadav", "Raju Das", "Lalit Kumar", "Om Prakash", "Naveen Pillai",
        "Sahil Khan", "Imran Sheikh", "Sameer Ali", "Faizan Ahmad", "Zubair Ansari"
    ];

    const name = names[i];

    // Random entry date between 2015 and 2022
    const entryDate = getRandomDate(new Date(2015, 0, 1), new Date(2022, 0, 1));

    // Random duration: 3 to 5 years
    const yearsToGraduate = Math.floor(Math.random() * 3) + 3;
    const gradDate = new Date(entryDate);
    gradDate.setFullYear(gradDate.getFullYear() + yearsToGraduate);
    gradDate.setMonth(gradDate.getMonth() + Math.floor(Math.random() * 12));

    return {
        studentId: String(idNum),
        fullname: name,
        graduationDate: formatDate(gradDate),
        dateOfEntry: formatDate(entryDate),
        duration: calculateDuration(entryDate, gradDate),
        gpa: (3 + Math.round(Math.random() * 60) / 100).toFixed(2),
        status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Alumni' : 'Inactive'
    };
});
