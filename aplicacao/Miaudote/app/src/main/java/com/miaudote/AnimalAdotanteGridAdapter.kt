package com.miaudote

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions

class AnimalAdotanteGridAdapter(
    private val animalsList: List<Animal>
) : RecyclerView.Adapter<AnimalAdotanteGridAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_animal_adotante, parent, false)

        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return animalsList.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val animal = animalsList[position]
        holder.bind(animal)
    }

    class ViewHolder(
        itemView: View
    ) : RecyclerView.ViewHolder(itemView) {

        fun bind(
            animal: Animal
        ) {
            Glide.with(itemView.context)
                .load(animal.picture)
                .apply(
                    RequestOptions()
                        .placeholder(R.drawable.loading_animation)
                        .error(R.drawable.ic_broken_image)
                )
                .into(itemView.findViewById(R.id.iv_picture))

            itemView.findViewById<TextView>(R.id.tv_animal_name).text = animal.name
            itemView.findViewById<TextView>(R.id.tv_birthday).text = animal.birthday
            itemView.findViewById<TextView>(R.id.tv_location).text = animal.location

            when(animal.gender) {
                "macho" -> itemView.findViewById<ImageView>(R.id.iv_gender).setImageResource(R.drawable.ic_card_male)
                "femea" -> itemView.findViewById<ImageView>(R.id.iv_gender).setImageResource(R.drawable.ic_card_female)
            }

            when(animal.bookmarked) {
                true -> itemView.findViewById<ImageView>(R.id.iv_bookmark).setImageResource(R.drawable.ic_card_animal_heart)
                else -> itemView.findViewById<ImageView>(R.id.iv_bookmark).setImageResource(R.drawable.ic_card_animal_empty_heart)
            }

        }
    }

}