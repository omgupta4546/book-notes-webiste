# Book Notes Application 📖
## **Description**
This is a full-stack web application that helps users keep a record of the books they have read. The app allows you to add books, write notes about them, give them a rating, and manage them. This project was created to implement **CRUD (Create, Read, Update, Delete)** operations.

## **Features**
  * **Add Book**: Add new books with their details (such as title, author, notes, rating, read date, and ISBN).
  * **View Books**: View all books in a responsive grid layout.
  * **Edit Book**: Update existing book details.
  * **Delete Book**: Delete entries for books that are no longer needed.
  * **Responsive Design**: The app works well on laptops, tablets, and mobile phones.

-----

### **Tech Stack**

  * **Frontend**: HTML, CSS, EJS (Embedded JavaScript)
  * **Backend**: Node.js, Express.js
  * **Database**: PostgreSQL
  * **Dependencies**: `express`, `ejs`, `pg`, `body-parser`

-----

### **Installation**

To run the project locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/omgupta4546/book-notes-webiste.git
    cd book-notes-webiste
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Database Setup**:

      * Install a PostgreSQL server on your system.
      * Create a new database.
      * Update the database connection details in the `index.js` file.

    <!-- end list -->

    ```javascript
    const db = new pg.Client({
        user: "your_user",
        host: "localhost",
        database: "your_database_name",
        password: "your_password",
        port: 5432,
    });
    ```

4.  **Run the application**:

    ```bash
    node index.js
    ```

5.  **View the app**:
    Open your browser and navigate to `http://localhost:4000` to view the app.

### **Contributing**

If you would like to contribute to this project, feel free to create a pull request.
