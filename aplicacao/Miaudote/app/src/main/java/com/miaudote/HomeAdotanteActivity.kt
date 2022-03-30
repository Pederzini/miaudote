package com.miaudote

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class HomeAdotanteActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_adotante)

        actionBar?.hide()
    }
}