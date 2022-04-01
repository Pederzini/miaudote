package com.miaudote

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.WindowManager
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate

private const val SECONDS = 2000L

class MainActivity : AppCompatActivity() {
    private lateinit var logo: ImageView
    private lateinit var bottomAnimation: Animation

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        supportActionBar?.hide()

        initUI()
        setupAnimation()
        initAnimation()
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
    }

    private fun initUI() {
        logo = findViewById(R.id.logo)

        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )
    }

    private fun setupAnimation() {
        bottomAnimation = AnimationUtils.loadAnimation(this, R.anim.bottom_slide)
        logo.startAnimation(bottomAnimation)
    }

    private fun initAnimation() {
        Handler().postDelayed({
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }, SECONDS)
    }
}