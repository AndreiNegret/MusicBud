$(document).ready(function () {
    const checkbox = $('.my-form input[type="checkbox"]');
    const btns = $(".my-form button");
    checkbox.change(function () {
        const checked = $(this).is(':checked');
        btns.each(function () {
            checked ? (this.disabled = false) : (this.disabled = true);
        });
    });
});