window.loadCategoriesWithSubcategories = async function () {
    try {
        const res = await fetch(`${BASE_URL}/categories`);
        const data = await res.json();

        const categoryList = document.getElementById("categoryList");
        if (!categoryList) return;

        categoryList.innerHTML = "";

        for (const cat of data.detail.data) {
            if (!cat.is_active) continue;

            const li = document.createElement("li");
            li.innerHTML = `
                <a href="#">
                    ${cat.name}
                    <i class="lni lni-chevron-right"></i>
                </a>
                <ul class="inner-sub-category" id="subcat-${cat.id}"></ul>
            `;

            categoryList.appendChild(li);
            loadSubcategories(cat.id);
        }
    } catch (e) {
        console.error("Category load error", e);
    }
};

async function loadSubcategories(categoryId) {
    try {
        const res = await fetch(
            `${BASE_URL}/categories/${categoryId}/subcategories`
        );
        const data = await res.json();

        const ul = document.getElementById(`subcat-${categoryId}`);
        if (!ul) return;

        ul.innerHTML = "";

        data.detail.data.forEach(sub => {
            if (!sub.is_active) return;

            ul.innerHTML += `
                <li>
                    <a href="product-grids.html?category_id=${categoryId}&subcategory_id=${sub.id}">
                        ${sub.name}
                    </a>
                </li>
            `;
        });
    } catch (e) {
        console.error("Subcategory error", e);
    }
}
