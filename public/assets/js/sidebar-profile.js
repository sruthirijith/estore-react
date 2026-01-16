// ✅ GLOBAL init function
window.initSidebarProfile = async function () {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const sidebarImg = document.getElementById("sidebarProfileImage");
    const sidebarName = document.getElementById("sidebarName");
    const fileInput = document.getElementById("profileImageInput");

    if (!sidebarImg || !fileInput) return;

    /* ===============================
       LOAD SIDEBAR PROFILE
    =============================== */
    try {
        const res = await fetch(`${BASE_URL}/profile/image/username`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        if (res.ok) {
            const json = await res.json();
            const data = json.detail?.data;

            if (sidebarName) {
                sidebarName.innerText = data?.username || "";
            }

            sidebarImg.src = data?.profile_image
                ? data.profile_image
                : "assets/images/default-user.png";
        }
    } catch (err) {
        console.error("Sidebar profile load error:", err);
    }

    /* ===============================
       IMAGE CLICK → FILE PICKER
    =============================== */
    sidebarImg.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${BASE_URL}/profile/upload-image`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) return;

            const json = await res.json();
            if (json.detail?.data?.profile_image) {
                sidebarImg.src = json.detail.data.profile_image;
            }
        } catch (err) {
            console.error("Profile image upload error:", err);
        }
    };
};
