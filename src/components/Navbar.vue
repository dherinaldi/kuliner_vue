<template>
	<div>
        <b-navbar toggleable="lg" type="light">
            <div class="container">
                <b-navbar-brand href="#">Kulineran</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/foods">Foods</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/submenu_lain">SubMenu Lain</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/hello">Hello</router-link>
                        </li>
                    </b-navbar-nav>

                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar"
};
	
</script>