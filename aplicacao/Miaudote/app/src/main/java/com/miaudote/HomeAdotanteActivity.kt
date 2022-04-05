package com.miaudote

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView

class HomeAdotanteActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_adotante)

        actionBar?.hide()

        initUI()
    }

    private fun initUI() {
        recyclerView = findViewById(R.id.recycler_view)

        val animalsList = listOf<Animal>(
            Animal(
                "Mimzy",
                "femea",
                true,
                "11 anos",
                "2km de você",
                "https://i.imgur.com/pAFLAbM.png"
            ),
            Animal(
                "Zequinho",
                "macho",
                true,
                "5 anos",
                "5km de você",
                "https://i.imgur.com/pAFLAbM.png"
            ),
            Animal(
                "Lilicão",
                "femea",
                true,
                "9 anos",
                "10km de você",
                "https://www.pennlive.com/resizer/7VmHaiO4zQxkkrrho01gI2KbG7s=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/3F4RRPM7FVF4THTTTDPZF5L3EM.jpg"
            ),
            Animal(
                "Lilicão",
                "femea",
                true,
                "9 anos",
                "10km de você",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg"
            ),
            Animal(
                "Lilicão",
                "femea",
                true,
                "9 anos",
                "10km de você",
                "https://burst.shopifycdn.com/photos/beautiful-cat.jpg?width=1200&format=pjpg&exif=0&iptc=0"
            ),
            Animal(
                "Lilicão",
                "femea",
                true,
                "9 anos",
                "10km de você",
                "https://www.yorkshireeveningpost.co.uk/images-i.jpimedia.uk/imagefetch/https://jpgreatcontent.co.uk/wp-content/uploads/2021/12/shutterstock_7365013.jpg?width=640&enable=upscale"
            )
        )

        setDataToRecyclerView(animalsList)
    }

    private fun setDataToRecyclerView(animalsList: List<Animal>) {
        recyclerView.isNestedScrollingEnabled = false
        recyclerView.adapter = AnimalAdotanteGridAdapter(animalsList)
    }
}