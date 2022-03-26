package com.example.miaudote

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.WindowManager
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity

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


//        MobileAds.initialize(this) {}
//
//        adView = findViewById(R.id.adView)
//        val adRequest = AdRequest.Builder().build()
//        adView.loadAd(adRequest)
//
//        adView.adListener = object: AdListener() {
//            override fun onAdLoaded() {
//                Log.e("AAAAAAAAAAAAAAAA", "CARREGOU A PRIMEIRA PROPAGANDA")
//                print("CARREGOU A PRIMEIRA PROPAGANDA")
//            }
//
//            override fun onAdFailedToLoad(adError : LoadAdError) {
//                // Code to be executed when an ad request fails.
//            }
//
//            override fun onAdOpened() {
//                // Code to be executed when an ad opens an overlay that
//                // covers the screen.
//            }
//
//            override fun onAdClicked() {
//                // Code to be executed when the user clicks on an ad.
//            }
//
//            override fun onAdClosed() {
//                // Code to be executed when the user is about to return
//                // to the app after tapping on an ad.
//            }
//        }
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