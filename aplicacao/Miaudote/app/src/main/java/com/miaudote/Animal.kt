package com.miaudote

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Animal(
    val name: String,
    val gender: String,
    val bookmarked: Boolean,
    val birthday: String,
    val location: String,
    val picture: String
) : Parcelable