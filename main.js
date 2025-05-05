let expenses = [];
    let totalAmount = 0;

    // Get references to all input fields and table elements
    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const addBtn = document.getElementById('add-btn');
    const expensesTable = document.getElementById('expense-table');
    const total_amount = document.getElementById('total-amount');

    // Function to update total amount
    function updateTotal() {
      total_amount.textContent = totalAmount;
    }

    // Function to create a new row in the table
    function addExpenseToTable(expense) {
      const newRow = expensesTable.insertRow();

      const categoryCell = newRow.insertCell();
      const amountCell = newRow.insertCell();
      const dateCell = newRow.insertCell();
      const deleteCell = newRow.insertCell();

      categoryCell.textContent = expense.category;
      amountCell.textContent = expense.amount;
      dateCell.textContent = expense.date;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');

      // When delete button is clicked
      deleteBtn.addEventListener('click', function () {
        // Remove the expense from array
        expenses = expenses.filter(e => e !== expense);

        // Update total and remove row
        totalAmount -= expense.amount;
        updateTotal();
        expensesTable.removeChild(newRow);
      });

      deleteCell.appendChild(deleteBtn);
    }

    // When Add button is clicked
    addBtn.addEventListener('click', function () {
      const category = categorySelect.value;
      const amount = Number(amountInput.value);
      const date = dateInput.value;

      // Input validation
      if (category === '') {
        alert('Please select a Category');
        return;
      }
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid Amount');
        return;
      }
      if (date === '') {
        alert('Please select a Date');
        return;
      }

      // Create new expense object
      const expense = { category, amount, date };
      expenses.push(expense);
      totalAmount += amount;

      // Update table and total
      addExpenseToTable(expense);
      updateTotal();

      // Clear input fields
      categorySelect.value = '';
      amountInput.value = '';
      dateInput.value = '';
    });
    function exportToExcel() {
      if (expenses.length === 0) {
        alert("No data to export!");
        return;
      }
    
      // Define column headers manually to maintain order
      const formattedData = expenses.map(exp => ({
        Category: exp.category,
        Amount: exp.amount,
        Date: exp.date
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    
      XLSX.writeFile(workbook, "expenses.xlsx");
    
      alert("Exported to Excel!");
    }
    
