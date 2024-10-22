document.addEventListener("DOMContentLoaded", function () {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const budgetList = document.getElementById("budget-list");
  const themeToggle = document.getElementById("theme-toggle");

  // Load existing budgets and expenses from localStorage
  let budgets = JSON.parse(localStorage.getItem("budgets")) || {};
  let expenses = JSON.parse(localStorage.getItem("expenses")) || {};

  // Update the budget list display
  function updateBudgetList() {
    budgetList.innerHTML = "";
    for (let category in budgets) {
      const totalBudget = budgets[category];
      const spent = expenses[category] || 0;
      const percentageUsed = Math.min((spent / totalBudget) * 100, 100);

      const li = document.createElement("li");
      li.innerHTML = `
        <span>${category} - ₹${spent.toFixed(2)} / ₹${totalBudget.toFixed(
        2
      )}</span>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${percentageUsed}%;">${percentageUsed.toFixed(
        2
      )}%</div>
        </div>
      `;
      budgetList.appendChild(li);
    }
  }

  // Save budgets to localStorage
  function saveBudgets() {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }

  // Save expenses to localStorage
  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Handle budget form submission
  budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("category").value.trim();
    const budget = parseFloat(document.getElementById("budget").value);

    if (category && !isNaN(budget) && budget > 0) {
      budgets[category] = budget; // Set budget for the category
      saveBudgets();
      updateBudgetList();
      budgetForm.reset();
    }
  });

  // Handle expense form submission
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("expense-category").value.trim();
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (category && !isNaN(amount) && amount > 0) {
      if (!expenses[category]) {
        expenses[category] = 0; // Initialize expense for the category
      }
      expenses[category] += amount; // Add the amount to expenses
      saveExpenses();
      updateBudgetList();
      expenseForm.reset();
    }
  });

  // Theme toggle button
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
  });

  // Initial render of budget list
  updateBudgetList();
});


// Handle budget form submission
budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("category").value; // Get selected category
    const budget = parseFloat(document.getElementById("budget").value);

    if (!isNaN(budget) && budget > 0) {
        budgets[category] = budget;
        saveBudgets();
        updateBudgetList();
        budgetForm.reset();
    }
});

// Handle expense form submission
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("expense-category").value; // Get selected expense category
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (!isNaN(amount) && amount > 0) {
        if (!expenses[category]) {
            expenses[category] = 0;
        }
        expenses[category] += amount;
        saveExpenses();
        updateBudgetList();
        expenseForm.reset();
    }
});