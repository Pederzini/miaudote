package com.miaudote

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
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
//                .into(itemView.movie_poster)

//            itemView.movie_title.text = movie.title
        }
    }

}