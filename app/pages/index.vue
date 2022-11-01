<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-card class="pa-2">
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-btn
                  depressed
                  block
                  color="secondary"
                  :outlined="register_mode"
                  @click="register_mode ? switch_mode() : null"
                >
                  Connexion
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  depressed
                  block
                  color="secondary"
                  :outlined="!register_mode"
                  @click="!register_mode ? switch_mode() : null"
                >
                  Inscription
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-spacer />
          <v-switch v-model="register_mode" color="grey" inset></v-switch>
          <v-spacer /> -->
        </v-card-actions>
        <v-card-actions>
          <v-container>
            <v-row class="text-xs-right">
              <v-spacer />
              <v-col cols="8 " class="text-md-center">
                <em>
                  <small color="info">
                    {{
                      register_mode
                        ? "Saisissez les informations requises et envoyez pour continuer."
                        : "Saisissez votre adresse email et votre mot de passe pour continuer."
                    }}
                  </small>
                </em>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row class="creds">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-if="register_mode"
                      type="text"
                      v-model="user.informations.firstname"
                      label="Nom"
                      placeholder="White"
                      outlined
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-if="register_mode"
                      type="text"
                      v-model="user.informations.lastname"
                      label="Prénom"
                      placeholder="Walter"
                      outlined
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-if="register_mode"
                      type="text"
                      v-model="user.credentials.username"
                      label="Prénom"
                      placeholder="Walter"
                      outlined
                    ></v-text-field
                  ></v-col>
                  <v-col :cols="register_mode ? 6 : 12">
                    <v-text-field
                      type="email"
                      v-model="user.credentials.email"
                      label="Adress mail"
                      placeholder="exemple@gmail.com"
                      outlined
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col :cols="register_mode ? 6 : 12">
                    <v-text-field
                      type="password"
                      v-model="user.credentials.password"
                      label="Mot de passe"
                      placeholder="********"
                      outlined
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-if="register_mode"
                      type="password"
                      v-model="user.conf_password"
                      label="Confiramtion du mot de passe"
                      placeholder="********"
                      outlined
                    ></v-text-field
                  ></v-col>
                </v-row>
              </v-container>
            </v-row>
            <v-row>
              <v-spacer />
              <v-col cols="6">
                <v-btn
                  block
                  color="primary"
                  @click="register_mode ? register() : login()"
                >
                  {{ register_mode ? "S'inscrire" : "Se connecter" }}
                </v-btn></v-col
              >
              <v-spacer />
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "IndexPage",
  data: () => {
    return {
      register_mode: false,
      user: {
        informations: {
          firstName: "",
          lastName: "",
        },
        credentials: {
          username: "",
          email: "",
          password: "",
        },
        conf_password: "",
      },
      rules: {
        string: [
          (value) => (value || "").trim().length || "Champ obligatoire !",
        ],
      },
    };
  },
  // mounted: function () {
  //   if (this.$store.state && this.$store.state.auth) {
  //     this.$router.push("/dashboard");
  //   }
  // },
  methods: {
    switch_mode() {
      this.register_mode = !this.register_mode;
    },
    login() {
      this.$post("/login", { credentials: this.user.credentials })
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("setAuth", res.data);
            Cookie.set("auth", res.data);
            this.$router.push("/dashboard");
          } else {
            this.$notify({
              title: "Error occured",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            title : "Error Occured",
            text : error.message,
            type : "error",
            showAnimation: "slideDown"
          })
        });
    },
    register() {
      this.user.credentials.password == this.user.conf_password &&
        this.$post("/signup", {
          credentials: this.user.credentials,
          informations: this.user.informations,
        })
          .then((res) => {
            if(res.data.success) {
              this.login();
            }
          })
          .catch((error) => {
            this.$notify({
              title : "Error Occured",
              text : error.message,
              type: "error",
              showAnimation: "slideDown"
            })
          });
    },
  },
};
</script>
