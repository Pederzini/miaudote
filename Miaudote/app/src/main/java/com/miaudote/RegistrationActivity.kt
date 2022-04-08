package com.miaudote

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.widget.LinearLayout
import android.widget.ViewFlipper
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import com.google.android.material.bottomsheet.BottomSheetDialog

private const val FLIPPER_FIRST_PAGE = 0
private const val FLIPPER_SECOND_PAGE = 1
private const val FLIPPER_THIRD_PAGE = 2

class RegistrationActivity : AppCompatActivity() {

    private lateinit var viewFlipper: ViewFlipper
    private lateinit var continueButtonPageOne: AppCompatButton
    private lateinit var continueButtonPageTwo: AppCompatButton
    private lateinit var backButtonPageTwo: AppCompatButton
    private lateinit var backButtonPageThree: AppCompatButton
    private lateinit var finishButtonPageThree: AppCompatButton
    private var initialX: Float = 0.0f

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_registration)

        initUI()
        setupListeners()
    }

    private fun initUI() {
        supportActionBar?.apply {
            this.setDisplayHomeAsUpEnabled(true)
            this.title = null
        }

        viewFlipper = findViewById(R.id.view_flipper)
        continueButtonPageOne = findViewById(R.id.continue_button_page_one)
        continueButtonPageTwo = findViewById(R.id.continue_button_page_two)
        backButtonPageTwo = findViewById(R.id.back_button_page_two)
        backButtonPageThree = findViewById(R.id.back_button_page_three)
        finishButtonPageThree = findViewById(R.id.finish_button_page_three)
    }

    private fun setupListeners() {
        continueButtonPageOne.setOnClickListener {
            viewFlipper.setInAnimation(baseContext, R.anim.slide_out)
            viewFlipper.displayedChild = FLIPPER_SECOND_PAGE
        }

        continueButtonPageTwo.setOnClickListener {
            viewFlipper.setInAnimation(baseContext, R.anim.slide_out)
            viewFlipper.displayedChild = FLIPPER_THIRD_PAGE
        }

        backButtonPageTwo.setOnClickListener {
            viewFlipper.setInAnimation(baseContext, R.anim.slide_in)
            viewFlipper.displayedChild = FLIPPER_FIRST_PAGE
        }

        backButtonPageThree.setOnClickListener {
            viewFlipper.setInAnimation(baseContext, R.anim.slide_in)
            viewFlipper.displayedChild = FLIPPER_SECOND_PAGE
        }

        finishButtonPageThree.setOnClickListener {
            val bottomSheetDialog = BottomSheetDialog(
                this, R.style.BottomSheetDialogTheme
            )
            val bottomSheetView: View = LayoutInflater.from(this)
                .inflate(
                    R.layout.bottom_sheet_registration,
                    findViewById<View>(R.id.registration_bottom_sheet) as LinearLayout?
                )

            bottomSheetDialog.setContentView(bottomSheetView)
            bottomSheetDialog.show()
        }

    }

    private fun openLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

    override fun onBackPressed() {
        when (viewFlipper.displayedChild) {
            FLIPPER_FIRST_PAGE -> openLogin()
            FLIPPER_SECOND_PAGE -> viewFlipper.displayedChild = FLIPPER_FIRST_PAGE
            FLIPPER_THIRD_PAGE -> viewFlipper.displayedChild = FLIPPER_SECOND_PAGE
        }
    }

    override fun onTouchEvent(touchevent: MotionEvent): Boolean {
        when (touchevent.action) {
            MotionEvent.ACTION_DOWN -> initialX = touchevent.x
            MotionEvent.ACTION_UP -> {
                val finalX = touchevent.x
                if (initialX > finalX) {
                    when (viewFlipper.displayedChild) {
                        FLIPPER_FIRST_PAGE -> {
                            setupOutAnimation()
                            viewFlipper.displayedChild = FLIPPER_SECOND_PAGE
                        }
                        FLIPPER_SECOND_PAGE -> {
                            setupOutAnimation()
                            viewFlipper.displayedChild = FLIPPER_THIRD_PAGE
                        }
                    }
                } else {
                    when (viewFlipper.displayedChild) {
                        FLIPPER_SECOND_PAGE -> {
                            setupInAnimation()
                            viewFlipper.displayedChild = FLIPPER_FIRST_PAGE
                        }
                        FLIPPER_THIRD_PAGE -> {
                            setupInAnimation()
                            viewFlipper.displayedChild = FLIPPER_SECOND_PAGE
                        }
                    }
                }
            }
        }

        return false
    }

    private fun setupInAnimation() {
        viewFlipper.setInAnimation(baseContext, R.anim.slide_in)
    }

    private fun setupOutAnimation() {
        viewFlipper.setInAnimation(baseContext, R.anim.slide_out)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return if (item.itemId == android.R.id.home) {
            openLogin()
            true
        } else {
            super.onOptionsItemSelected(item)
        }
    }

}