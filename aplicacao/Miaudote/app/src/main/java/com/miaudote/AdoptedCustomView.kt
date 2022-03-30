package com.miaudote

import android.content.Context
import android.util.AttributeSet
import androidx.constraintlayout.widget.ConstraintLayout

class AdoptedCustomView(context: Context, attrs: AttributeSet) :
    ConstraintLayout(context, attrs) {

    init {
        inflate(context, R.layout.adopted_custom_view, this)

        setBackgroundResource(R.drawable.transparent_orange_square)
    }

}