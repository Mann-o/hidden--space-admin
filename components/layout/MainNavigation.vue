<template lang="pug">
  BNavbar(toggleable="lg" type="dark" variant="primary")
    BNavbarBrand(to="/") Hidden Space Admin

    BNavbarToggle(target="nav-collapse")

    BCollapse(id="nav-collapse" is-nav)
      BNavbarNav(sticky)
        BNavItem(to="/" active-class="active" exact) Home
        BNavItem(to="/spaces" active-class="active") Spaces
        BNavItem(to="/therapists" active-class="active") Therapists
        BNavItem(to="/posts" active-class="active") Posts
        BNavItem(to="/users" active-class="active") Users
        BNavItem(to="/media" active-class="active") Media
        BNavItem(to="/logout" active-class="active") Logout
</template>

<script>
export default {
  name: 'MainNavigation',
}
</script>
