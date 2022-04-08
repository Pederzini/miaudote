package com.miaudote

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton

class PerfilActivity: AppCompatActivity() {

    private lateinit var editarSenhaButton: AppCompatButton
    private lateinit var sairButton: AppCompatButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        supportActionBar?.hide()

        initUI()
        setupClickListeners()
    }

    private fun initUI() {
        editarSenhaButton = findViewById(R.id.trocar_senha_button)
        sairButton = findViewById(R.id.logout_button)
    }

    private fun setupClickListeners() {
        editarSenhaButton.setOnClickListener {
            val intent = Intent(this, RegistrationActivity::class.java)
            startActivity(intent)
            finish()
        }

        //FIX logout ubtton
        sairButton.setOnClickListener {
            val intent = Intent(this, RegistrationActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

}