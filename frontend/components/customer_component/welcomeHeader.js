export default {
    props: ['username'],
    template: `
    <div class="welcome-header my-4">
        <h2 class="display-6 text-gray-800">Welcome {{username}}</h2>
    </div>
    `,
    data() {
        return {}
    }
}